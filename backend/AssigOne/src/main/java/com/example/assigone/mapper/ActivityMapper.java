package com.example.assigone.mapper;

import com.example.assigone.dto.ActivityDTO;
import com.example.assigone.model.Activity;
import org.springframework.stereotype.Component;

@Component
public class ActivityMapper {
    public Activity toActivity(ActivityDTO dto){
        Activity activity = new Activity();
        activity.setId(dto.getId());
        activity.setUserId(dto.getUserId());
        activity.setUsername(dto.getUsername());
        activity.setAction(dto.getAction());
        activity.setDate(dto.getDate());

        return activity;
    }

    public ActivityDTO toDTO(Activity activity){
        ActivityDTO dto = new ActivityDTO();
        dto.setId(activity.getId());
        dto.setUserId(activity.getUserId());
        dto.setUsername(activity.getUsername());
        dto.setAction(activity.getAction());
        dto.setDate(activity.getDate());

        return dto;
    }
}
