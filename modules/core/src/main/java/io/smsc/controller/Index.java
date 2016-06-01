package io.smsc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller(
        value = "IndexController"
)
public class Index {
    @Autowired
    String adminIndexHTML;

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
                    "/admin/*"
            },
            produces = {
                    MediaType.TEXT_HTML_VALUE
            }
    )
    @ResponseBody
    public String adminAction(HttpServletResponse response) {
        response.setContentType(MediaType.TEXT_HTML_VALUE);
        response.setCharacterEncoding("UTF-8");

        return adminIndexHTML;
    }
}
