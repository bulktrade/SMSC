package io.smsc.controller;

import io.smsc.model.admin.Config;
import io.smsc.service.StaticResourceService;
import org.apache.commons.codec.digest.DigestUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Optional;

@Controller(
        value = "IndexController"
)
public class IndexController {

    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);
    private static final Long lastModified = Calendar.getInstance().getTimeInMillis();
    @Autowired
    private StaticResourceService staticResourceService;

    @RequestMapping("/")
    @ResponseBody
    public String indexAction(ServletWebRequest servletWebRequest, HttpServletResponse response) {
        if (servletWebRequest.checkNotModified(lastModified)) {
            return null;
        }

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        return "SMSC";
    }

    @RequestMapping(
            value = {
                    "/admin",
                    "/admin/",
                    "/admin/*",
                    "/admin/**",
                    "/admin/**/**"
            }
    )
    @ResponseBody
    public ResponseEntity<Resource> adminAction(
            HttpServletRequest request,
            ServletWebRequest servletWebRequest
    ) {
        try {
            Optional<Object> filePath = Optional.of(request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE));
            Integer prefixLength = "/admin/".length();

            if (filePath.isPresent() && filePath.get().toString().length() > prefixLength) {
                String realFilePath = filePath.get().toString().substring(prefixLength);
                String classFilePath = "classpath:META-INF/resources/io.smsc.admin/" + realFilePath;
                Resource resource = staticResourceService.getResource(classFilePath);

                if (resource.exists()) {
                    if (servletWebRequest.checkNotModified(DigestUtils.md5Hex(DigestUtils.md5(resource.getInputStream())), lastModified)) {
                        return null;
                    }

                    return new ResponseEntity<>(resource, HttpStatus.OK);
                }
            }

            Resource resource = staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html");
            if (servletWebRequest.checkNotModified(DigestUtils.md5Hex(DigestUtils.md5(resource.getInputStream())), lastModified)) {
                return null;
            }

            return new ResponseEntity<>(resource, HttpStatus.OK);
        } catch (IOException e) {
            LOGGER.info("Resource not found.", e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = {
                    "/admin/config.json"
            },
            produces = {
                    MediaType.APPLICATION_JSON_UTF8_VALUE
            }
    )
    @ResponseBody
    public Config configAction(HttpServletResponse response) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
        response.setCharacterEncoding("UTF-8");

        Config config;

        try {
            String configJson = staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json");

            ObjectMapper mapper = new ObjectMapper();
            config = mapper.readValue(configJson, Config.class);

            if (System.getenv("ADMIN_API_URL") != null) {
                config.apiUrl = System.getenv("ADMIN_API_URL");
            } else if (System.getProperty("admin.api.url") != null) {
                config.apiUrl = System.getProperty("admin.api.url");
            }

            if (System.getenv("ADMIN_I18N_PATH") != null) {
                config.i18nPath = System.getenv("ADMIN_I18N_PATH");
            }

            if (System.getenv("ADMIN_DEBUG") != null) {
                config.debug = System.getenv("ADMIN_DEBUG").equals("true");
            }
        } catch (Exception e) {
            config = new Config();
        }

        return config;
    }
}
