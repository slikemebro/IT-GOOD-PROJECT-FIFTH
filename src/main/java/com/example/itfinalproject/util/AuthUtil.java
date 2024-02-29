package com.example.itfinalproject.util;

import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.exception.UserAreNotAuthorizedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public final class AuthUtil {

    private AuthUtil() {
    }

    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            return (User) authentication.getPrincipal();
        }
        throw new UserAreNotAuthorizedException("User are not authorized");
    }
}
