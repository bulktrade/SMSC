package io.smsc.repository;

import io.smsc.config.ApplicationConfig;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.ExpectedException;
import org.junit.rules.Stopwatch;
import org.junit.runner.Description;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@ContextConfiguration(classes = {ApplicationConfig.class})
@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
public abstract class AbstractRepositoryTest {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractRepositoryTest.class);

    @Before
    public void setDb(){
        System.setProperty("smsc.database","postgresql");
    }

    private static StringBuilder results = new StringBuilder();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Rule
    // http://stackoverflow.com/questions/14892125/what-is-the-best-practice-to-determine-the-execution-time-of-the-bussiness-relev
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
}
