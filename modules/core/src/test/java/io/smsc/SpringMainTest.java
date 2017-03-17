package io.smsc;

import org.junit.Before;
import org.junit.Test;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class SpringMainTest {

    private static final String SPRING_STARTUP = ":: Spring Boot ::";

    private ByteArrayOutputStream output;

    @Before
    public void setUp() {
        output = new ByteArrayOutputStream();
        System.setOut(new PrintStream(output));
    }

    @Test
    public void testEmptyApplicationContext() throws Exception {
        Application.main(getArgs());

        assertThat(getOutput()).contains(SPRING_STARTUP);
    }

    @Test
    public void testBasePackageScan() throws Exception {
        Application.main(getArgs(ClassUtils.getPackageName(getClass())));

        assertThat(getOutput()).contains(SPRING_STARTUP);
    }

    private String[] getArgs(String... args) {
        List<String> list = new ArrayList<>(Arrays.asList(
                "--spring.main.webEnvironment=true", "--spring.main.showBanner=OFF",
                "--spring.main.registerShutdownHook=false", "--server.port=0"));
        if (args.length > 0) {
            list.add("--spring.main.sources="
                    + StringUtils.arrayToCommaDelimitedString(args));
        }

        return list.toArray(new String[list.size()]);
    }

    private String getOutput() {
        return this.output.toString();
    }
}
