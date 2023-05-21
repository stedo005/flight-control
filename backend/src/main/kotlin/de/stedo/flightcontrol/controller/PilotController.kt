package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.repository.Pilots
import de.stedo.flightcontrol.repository.RcModels
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("/api/pilot")
class PilotController(
    private val pilots: Pilots,
    private val rcModels: RcModels,
) {
    @GetMapping("/all")
    fun getAllPilots(): MutableList<Pilot> {
        return pilots.findAll()
    }

    @PostMapping("/create")
    fun createPilot(@RequestBody pilot: Pilot): String {
        pilots.save(
            Pilot(
                name = pilot.name,
                password = "123"
            )
        )
        return "Pilot gespeichert!"
    }
}