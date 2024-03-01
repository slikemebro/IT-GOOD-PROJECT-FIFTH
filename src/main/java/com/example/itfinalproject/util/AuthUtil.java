package com.example.itfinalproject.util;

import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.exception.UserAreNotAuthorizedException;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Log4j2
public final class AuthUtil {

    private AuthUtil() {
    }

    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            log.info("Get current user");
            return (User) authentication.getPrincipal();
        }
        throw new UserAreNotAuthorizedException("User are not authorized");
    }

    public static Authentication getCurrentAuthentication() {
        log.info("Get current authentication");
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static void setCurrentAuthentication(Authentication authentication) {
        log.info("Set current authentication");
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
