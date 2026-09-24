package com.resume.resumeanalyzer.controller;

import com.resume.resumeanalyzer.dto.LoginRequest;
import com.resume.resumeanalyzer.dto.RegisterRequest;
import com.resume.resumeanalyzer.dto.UserResponse;
import com.resume.resumeanalyzer.entity.User;
import com.resume.resumeanalyzer.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User savedUser = userService.registerUser(user);

        return new UserResponse(savedUser);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        return new UserResponse(user);
    }
}