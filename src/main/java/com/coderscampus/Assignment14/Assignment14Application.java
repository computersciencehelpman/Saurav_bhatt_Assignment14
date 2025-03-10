package com.coderscampus.Assignment14;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Assignment14Application {

	public static void main(String[] args) {
		SpringApplication.run(Assignment14Application.class, args);
	}

}
