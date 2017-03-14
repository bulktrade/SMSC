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

/**
 * The IndexController class is used for mapping HTTP requests for receiving base application page,
 * specific admin resource or app configuration from internal json file or external system\environment
 * variables onto specific methods.
 *
 * @author Sergej Kunz
 * @since 0.0.1-SNAPSHOT
 */
@Controller(
        value = "IndexController"
)
public class IndexController {

    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);
    private static final Long LAST_MODIFIED = Calendar.getInstance().getTimeInMillis();

    @Autowired
    private StaticResourceService staticResourceService;

    @Value("${admin.api.url:#{null}}")
    public String apiUrl;

    @Value("${admin.i18n.path:#{null}}")
    private String i18nPath;

    @Value("${admin.debug:#{null}}")
    private String debug;

    /**
     * Method to receive base app representation.
     *
     * @param servletWebRequest the {@link ServletWebRequest}
     * @param response          the {@link HttpServletResponse} to provide HTTP-specific
     *                          functionality in sending a response
     * @return String with app representation
     */
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

    /**
     * Method to receive specific admin resource or basic index.html file.
     *
     * @param servletWebRequest the {@link ServletWebRequest}
     * @param request           the {@link HttpServletResponse} to provide HTTP-specific
     *                          functionality in sending a response
     * @return {@link ResponseEntity} with requested resource
     */
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
        } catch (IOException e) {
            LOGGER.info("Resource not found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Method to receive domain object with app configuration from internal json file or
     * external system\environment variables.
     *
     * @param response the {@link HttpServletResponse} to provide HTTP-specific
     *                 functionality in sending a response
     * @return {@link Config} with application configuration
     * @throws IOException on input error
     */
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

        } catch (Exception e) {
            LOGGER.info("No config file or inappropriate data");
            config = new Config();
        }

        if (apiUrl != null) {
            config.apiUrl = this.apiUrl;
        }

        if (i18nPath != null) {
            config.i18nPath = this.i18nPath;
        }

        if (debug != null) {
            config.debug = "true".equals(this.debug);
        }

        return config;
    }
}
