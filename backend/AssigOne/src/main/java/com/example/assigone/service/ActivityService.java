package com.example.assigone.service;

import com.example.assigone.dto.ActivityDTO;
import com.example.assigone.dto.UserDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ActivityService {
    ActivityDTO saveAction(ActivityDTO dto);

    List<ActivityDTO> getAllActivities();
}
