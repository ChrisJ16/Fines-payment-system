package com.example.assigone.controller;

import com.example.assigone.dto.ActivityDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.assigone.service.ActivityService;

@RestController
@Setter
@Getter
@CrossOrigin
public class ActivityController {
    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping("/addActivity")
    ResponseEntity<ActivityDTO> addActivity(@RequestBody ActivityDTO activitydto){
        ActivityDTO registeredActivity = activityService.saveAction(activitydto);
        return ResponseEntity.ok(registeredActivity);
    }

    @GetMapping("/getActivities")
    public ResponseEntity<java.util.List<ActivityDTO>> findAllActivities(){
        java.util.List<ActivityDTO> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }
}
