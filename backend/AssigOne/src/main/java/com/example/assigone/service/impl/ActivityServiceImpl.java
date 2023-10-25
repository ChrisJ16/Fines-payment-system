package com.example.assigone.service.impl;

import com.example.assigone.dto.ActivityDTO;
import com.example.assigone.mapper.ActivityMapper;
import com.example.assigone.model.Activity;
import com.example.assigone.repository.ActivityRepository;
import com.example.assigone.service.ActivityService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
public class ActivityServiceImpl implements ActivityService {
    @Autowired
    private ActivityRepository activityRepository;
    private ActivityMapper activityMapper;

    public ActivityServiceImpl(ActivityRepository activityRepository, ActivityMapper activityMapper){
        this.activityRepository = activityRepository;
        this.activityMapper = activityMapper;
    }

    @Override
    public ActivityDTO saveAction(ActivityDTO dto) {
        Activity savedActivity = activityRepository.save(activityMapper.toActivity(dto));
        return activityMapper.toDTO(savedActivity);
    }

    @Override
    public List<ActivityDTO> getAllActivities() {
        List<Activity> activities = activityRepository.findAll();
        return activities.stream().map(activityMapper::toDTO).collect(java.util.stream.Collectors.toList());
    }
}
