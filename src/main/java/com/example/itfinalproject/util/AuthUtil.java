package com.example.itfinalproject.util;

import com.example.itfinalproject.exception.UserAreNotAuthorizedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public final class AuthUtil {

    private AuthUtil() {
    }

    public static UserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            return (UserDetails) authentication.getPrincipal();
        }
        throw new UserAreNotAuthorizedException("User are not authorized");
    }
}
