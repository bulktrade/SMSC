package io.smsc.repository;

import io.smsc.spring.SpringConfig;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@ContextConfiguration(classes = {SpringConfig.class})
@RunWith(SpringJUnit4ClassRunner.class)
public abstract class AbstractRepositoryTest {

    @Before
    public void setDb(){
        System.setProperty("smsc.database","postgresql");
    }
}
