package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.repository.PilotRepository
import de.stedo.flightcontrol.repository.RcModelRepository
import de.stedo.flightcontrol.service.PilotService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/pilot")
@CrossOrigin
class PilotController(
    private val pilotRepository: PilotRepository,
    private val rcModelRepository: RcModelRepository,
    private val passwordEncoder: BCryptPasswordEncoder,
    private val pilotService: PilotService,
) {
    @GetMapping("/all")
    fun getAllPilots(): MutableList<Pilot> {
        return pilotRepository.findAll()
    }

    @PostMapping("/create")
    fun createPilot(@RequestBody pilot: Pilot): Pilot {
        pilot.password = passwordEncoder.encode(pilot.password)
        return pilotService.createPilot(pilot)
    }
}