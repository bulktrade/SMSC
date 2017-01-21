package io.smsc.controller;

import io.smsc.model.admin.Config;
import io.smsc.service.StaticResourceService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.HandlerMapping;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.util.Optional;

@Controller(
        value = "IndexController"
)
public class IndexController {
    @Autowired
    private StaticResourceService staticResourceService;

    @RequestMapping("/")
    @ResponseBody
    public String indexAction(HttpServletResponse response) {
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
    public byte[] adminAction(
            HttpServletRequest request
    ) {
        Optional<Object> filePath = Optional.of(request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE));
        Integer prefixLength = "/admin/".length();

        if (filePath.isPresent() && filePath.get().toString().length() > prefixLength) {
            String realFilePath = filePath.get().toString().substring(prefixLength);
            String classFilePath = "classpath:META-INF/resources/io.smsc.admin/" + realFilePath;
            byte[] content = staticResourceService.getBinarayContent(classFilePath);

            if (content != null) {
                return content;
            }
        }

        return staticResourceService.getBinarayContent("classpath:META-INF/resources/io.smsc.admin/index.html");
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
