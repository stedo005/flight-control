package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.entities.PilotDto
import de.stedo.flightcontrol.repository.PilotRepository
import de.stedo.flightcontrol.repository.RcModelRepository
import de.stedo.flightcontrol.service.PilotService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
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
    fun createPilot(@RequestBody pilotDto: PilotDto): ResponseEntity<PilotDto> {
        return if (pilotDto.registerKey != "42") {
            ResponseEntity(HttpStatus.NOT_ACCEPTABLE)
        } else {
            val pilot = pilotDto.toPilot(pilotDto)
            pilot.password = passwordEncoder.encode(pilot.password)
            pilotService.createPilot(pilot)
        }
    }
}