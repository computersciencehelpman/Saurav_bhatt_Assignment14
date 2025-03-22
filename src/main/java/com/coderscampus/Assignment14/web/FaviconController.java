package com.coderscampus.Assignment14.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
public class FaviconController {
    
    @GetMapping("/favicon.ico")
    public ResponseEntity<byte[]> getFavicon() {
        try {
            ClassPathResource resource = new ClassPathResource("static/favicon.ico");
            InputStream inputStream = resource.getInputStream();
            byte[] faviconBytes = inputStream.readAllBytes();

            return ResponseEntity.ok()
                    //.contentType(MediaType.IMAGE_XICON)
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=86400")
                    .body(faviconBytes);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
