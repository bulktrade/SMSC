package io.smsc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller(
	value = "IndexController"
)
public class Index {
	@RequestMapping("/")
	@ResponseBody
	public String indexAction(HttpServletResponse response) {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

		return "SMSC";
	}
}
