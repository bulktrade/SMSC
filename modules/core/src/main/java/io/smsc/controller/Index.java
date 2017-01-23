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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

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
			"/admin/**/**"
		}
	)
	@ResponseBody
	public byte[] adminAction(
		HttpServletResponse response,
		HttpServletRequest request
	) {
		Optional<Object> filePath = Optional.of(request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE));
		Integer prefixLength = "/admin/".length();

		if (filePath.isPresent() && filePath.get().toString().length() > prefixLength) {
			String realFilePath = filePath.get().toString().substring(prefixLength);
			byte[] content = staticResourceService.getBinarayContent("classpath:META-INF/resources/io.smsc.admin/" + realFilePath);

			if (content != null) {
				return content;
			}
		}

		response.setContentType(MediaType.TEXT_HTML_VALUE);
		response.setCharacterEncoding("UTF-8");

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

		String configJson = staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json");

		ObjectMapper mapper = new ObjectMapper();
		Config config = mapper.readValue(configJson, Config.class);

		if (System.getenv("ADMIN_ORIENTDB_URL") != null) {
			config.orientDBUrl = System.getenv("ADMIN_ORIENTDB_URL");
		} else if (System.getProperty("admin.orientdb.url") != null) {
			config.orientDBUrl = System.getProperty("admin.orientdb.url");
		}

		if (System.getenv("ADMIN_ORIENTDB_DATABASE") != null) {
			config.orientDBDatabase = System.getenv("ADMIN_ORIENTDB_DATABASE");
		} else if (System.getProperty("admin.orientdb.database") != null) {
			config.orientDBDatabase = System.getProperty("admin.orientdb.database");
		}

		if (System.getenv("ADMIN_I18N_PATH") != null) {
			config.i18nPath = System.getenv("ADMIN_I18N_PATH");
		}

		if (System.getenv("ADMIN_DEBUG") != null) {
			config.debug = System.getenv("ADMIN_DEBUG").equals("true");
		}
		
		return config;
	}
}
