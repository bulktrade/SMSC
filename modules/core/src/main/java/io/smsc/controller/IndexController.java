package io.smsc.controller;

import io.smsc.model.admin.Config;
import io.smsc.service.StaticResourceService;
import org.apache.commons.codec.digest.DigestUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import java.io.IOException;
import java.util.Calendar;
import java.util.Optional;

@Controller(
        value = "IndexController"
)
public class IndexController {

    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);
    private static final Long LAST_MODIFIED = Calendar.getInstance().getTimeInMillis();

    @Autowired
    private StaticResourceService staticResourceService;

    @Value("${ADMIN_API_URL:#{null}}")
    public String apiUrl;

    @Value("${ADMIN_I18N_PATH:#{null}}")
    private String i18nPath;

    @Value("${ADMIN_DEBUG:#{null}}")
    private String debug;

    @RequestMapping("/")
    @ResponseBody
    public String indexAction(ServletWebRequest servletWebRequest, HttpServletResponse response) {
        if (servletWebRequest.checkNotModified(LAST_MODIFIED)) {
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

                if (resource.exists() && servletWebRequest.checkNotModified(DigestUtils.md5Hex(DigestUtils.md5(resource.getInputStream())), LAST_MODIFIED)) {
                    return null;
                } else if (resource.exists()) {
                    return new ResponseEntity<>(resource, HttpStatus.OK);
                }
            }

            Resource resource = staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html");
            if (servletWebRequest.checkNotModified(DigestUtils.md5Hex(DigestUtils.md5(resource.getInputStream())), LAST_MODIFIED)) {
                return null;
            }

            return new ResponseEntity<>(resource, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Resource not found.");
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

            if (apiUrl != null) {
                config.apiUrl = this.apiUrl;
            }

            if (i18nPath != null) {
                config.i18nPath = this.i18nPath;
            }

            if (debug != null) {
                config.debug = "true".equals(this.debug);
            }
        } catch (Exception e) {
            LOGGER.info("Some exception occurred", e);
            config = new Config();
        }

        return config;
    }
}
