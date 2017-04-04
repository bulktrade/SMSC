package io.smsc;

import io.smsc.config.*;
import io.smsc.jwt.service.JWTTokenGenerationService;
import io.smsc.jwt.service.JWTUserDetailsService;
import io.smsc.repository.admin.UserRepository;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.ExpectedException;
import org.junit.rules.Stopwatch;
import org.junit.runner.Description;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.restdocs.JUnitRestDocumentation;
import org.springframework.restdocs.request.ParameterDescriptor;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertNotNull;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@TestPropertySource("classpath:hsqldb.properties")
@ContextConfiguration(classes = {Application.class, TestConfig.class, MvcConfiguration.class, Oracle10gDialectExtended.class,
        RepositoryIdExposingConfiguration.class, SecurityConfiguration.class, SecurityInit.class, SpringDataRestValidationConfiguration.class})
@AutoConfigureRestDocs(outputDir = "target/generated-snippets")
@Transactional
public abstract class AbstractSpringMVCTest {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractSpringMVCTest.class);

    private static StringBuilder results = new StringBuilder();

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected MockAuditorAware auditorAware;

    @Value("${jwt.header}")
    protected String tokenHeader;

    @Value("${jwt.secret}")
    protected String tokenSecret;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Rule
    public Stopwatch stopwatch = new Stopwatch() {
        @Override
        protected void finished(long nanos, Description description) {
            String result = String.format("%-25s %7d", description.getMethodName(), TimeUnit.NANOSECONDS.toMillis(nanos));
            results.append(result).append('\n');
            LOG.info(result + " ms\n");
        }
    };

    @Rule
    public final JUnitRestDocumentation restDocumentation =
            new JUnitRestDocumentation("target/generated-snippets");

    protected MockMvc mockMvc;

    protected MediaType contentType = MediaType.valueOf("application/hal+json;charset=UTF-8");

    @Autowired
    protected JWTTokenGenerationService jwtTokenGenerationService;

    @Autowired
    protected JWTUserDetailsService jwtUserDetailsService;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @AfterClass
    public static void printResults() {
        results = new StringBuilder("\n---------------------------------")
                .append("\nTest                 Duration, ms")
                .append("\n---------------------------------\n")
                .append(results)
                .append("---------------------------------\n");
        LOG.info(results.toString());
        results.setLength(0);
    }

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {
        this.mappingJackson2HttpMessageConverter = Arrays.stream(converters)
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }

    @Before
    public void setup() throws Exception {
        auditorAware.setCurrentAuditor(userRepository.findByUsername("admin"));
        this.mockMvc = webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .apply(documentationConfiguration(this.restDocumentation))
                .build();
    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);

        return mockHttpOutputMessage.getBodyAsString();
    }

    /**
     * Entity's id in path variables
     *
     * @return ParameterDescriptor
     */
    protected ParameterDescriptor[] getPathParam(String name) {
        return new ParameterDescriptor[]{
                parameterWithName("id").description(String.format("%s's id", name))
        };
    }
}
