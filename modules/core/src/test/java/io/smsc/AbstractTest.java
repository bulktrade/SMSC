package io.smsc;

import io.smsc.config.FlywayConfiguration;
import io.smsc.config.RepositoryIdExposingConfiguration;
import io.smsc.config.SecurityConfiguration;
import io.smsc.config.SpringDataRestValidationConfiguration;
import io.smsc.repository.customer.customer.CustomerRepository;
import io.smsc.repository.customer.customerContact.CustomerContactRepository;
import io.smsc.repository.dashboard.dashboard.DashboardRepository;
import io.smsc.repository.dashboard.dashboardBox.DashboardBoxRepository;
import io.smsc.repository.dashboard.dashboardBoxType.DashboardBoxTypeRepository;
import io.smsc.repository.role.RoleRepository;
import io.smsc.repository.user.UserRepository;
import io.smsc.security.service.JWTTokenGenerationService;
import io.smsc.security.service.JWTUserDetailsService;
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
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertNotNull;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@ContextConfiguration(classes = {Application.class, SecurityConfiguration.class, SpringDataRestValidationConfiguration.class,
        FlywayConfiguration.class, RepositoryIdExposingConfiguration.class})
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@Transactional
public abstract class AbstractTest {

    @Value("${encrypt.key}")
    protected String secretKey;

    @Value("${jwt.header}")
    protected String tokenHeader;

    @Value("${jwt.secret}")
    protected String tokenSecret;

//    private static String user;
//
//    private static String password;
//
//    private static String database;
//
//    @Value("${spring.datasource.username}")
//    public void setUser(String user) {
//        AbstractTest.user = user;
//    }
//
//    @Value("${spring.datasource.password}")
//    public void setPassword(String password) {
//        AbstractTest.password = password;
//    }
//
//    @Value("${spring.datasource.password}")
//    public void setDatabase(String database) {
//        AbstractTest.database = database;
//    }
//
//    @ClassRule
//    public static DockerRule postgreSQLRule = DockerRule.builder()
//            .imageName("orchardup/postgresql")
//            .expose("5432","5432")
//            .env("POSTGRESQL_USER",user)
//            .env("POSTGRESQL_PASS",password)
//            .env("POSTGRESQL_DB",database)
//            .build();
//
//    @ClassRule
//    public static DockerRule mySQLRule = DockerRule.builder()
//            .imageName("mysql:latest")
//            .expose("3306","3306")
//            .env("MYSQL_ROOT_PASSWORD","password")
//            .env("MYSQL_DATABASE","smsc")
//            .env("MYSQL_USER","user")
//            .env("MYSQL_PASSWORD","password")
//            .build();
//
//    @ClassRule
//    public static DockerRule oracleRule = DockerRule.builder()
//            .imageName("alexeiled/docker-oracle-xe-11g")
//            .expose("1521","1521")
//            .expose("8080","8080")
//            .build();

    private static final Logger LOG = LoggerFactory.getLogger(AbstractTest.class);

    private static StringBuilder results = new StringBuilder();

    protected MockMvc mockMvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    protected MediaType contentType = MediaType.valueOf("application/hal+json;charset=UTF-8");

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {
        this.mappingJackson2HttpMessageConverter = Arrays.stream(converters)
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);
        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    protected JWTTokenGenerationService jwtTokenGenerationService;

    @Autowired
    protected JWTUserDetailsService jwtUserDetailsService;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected RoleRepository roleRepository;

    @Autowired
    protected CustomerRepository customerRepository;

    @Autowired
    protected CustomerContactRepository customerContactRepository;

    @Autowired
    protected DashboardRepository dashboardRepository;

    @Autowired
    protected DashboardBoxRepository dashboardBoxRepository;

    @Autowired
    protected DashboardBoxTypeRepository dashboardBoxTypeRepository;

    @Before
    public void setup() throws Exception {
        this.mockMvc = webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

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

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }
}
