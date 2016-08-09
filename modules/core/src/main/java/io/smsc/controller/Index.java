package io.smsc.controller;

import io.smsc.service.StaticResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.Collections;

@Controller(
        value = "IndexController"
)
public class Index {
    @Autowired
    StaticResourceService staticResourceService;

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
                    "/admin/**/**",
            },
            produces = {
                    MediaType.TEXT_HTML_VALUE
            }
    )
    @ResponseBody
    public String adminAction(HttpServletResponse response) {
        response.setContentType(MediaType.TEXT_HTML_VALUE);
        response.setCharacterEncoding("UTF-8");

        return staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/index.html");
    }
}
