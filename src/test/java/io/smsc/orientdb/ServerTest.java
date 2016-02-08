package io.smsc.orientdb;

import io.smsc.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * Created by deacix on 08.02.16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {Application.class})
public class ServerTest {

	@Test
	public void testStart() throws Exception {
		System.setProperty("RUNMODE", "UNITTEST");
		Server.start().getInstance().shutdown();
	}
}