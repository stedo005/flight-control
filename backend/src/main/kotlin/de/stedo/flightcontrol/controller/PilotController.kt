package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.repository.PilotRepository
import de.stedo.flightcontrol.repository.RcModelRepository
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
) {
    @GetMapping("/all")
    fun getAllPilots(): MutableList<Pilot> {
        return pilotRepository.findAll()
    }

    @PostMapping("/create")
    fun createPilot(@RequestBody pilot: Pilot): String {
        pilotRepository.save(
            Pilot(
                name = pilot.name,
                password = passwordEncoder.encode("123"),
                roles = listOf("USER","ADMIN")
            )
        )
        return "Pilot gespeichert!"
    }
}