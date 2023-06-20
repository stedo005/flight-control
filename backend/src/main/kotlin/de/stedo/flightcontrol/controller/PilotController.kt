package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.entities.CreatePilotDto
import de.stedo.flightcontrol.entities.PilotDetail
import de.stedo.flightcontrol.repository.PilotRepository
import de.stedo.flightcontrol.repository.RcModelRepository
import de.stedo.flightcontrol.service.PilotService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/pilot")
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

    @GetMapping("/{username}")
    fun getPilotByUsername(@PathVariable username: String): ResponseEntity<Pilot> {
        return pilotService.getPilotByUsername(username)
    }

    @GetMapping("/by-id/{id}")
    fun getPilotById(@PathVariable id: String): ResponseEntity<Pilot> {
        return pilotService.getPilotById(id)
    }

    @GetMapping("/detail/{id}")
    fun getPilotDetailById(@PathVariable id: String): ResponseEntity<PilotDetail> {
        val pilot = pilotService.getPilotById(id)
       return ResponseEntity(pilot.body?.let {
            PilotDetail(
                firstname = it.firstname,
                lastname = it.lastname
            )
        }, HttpStatus.OK)
    }

    @PostMapping("/create")
    fun createPilot(@RequestBody createPilotDto: CreatePilotDto): ResponseEntity<CreatePilotDto> {
        return if (createPilotDto.registerKey != "42") {
            ResponseEntity(HttpStatus.NOT_ACCEPTABLE)
        } else {
            val pilot = createPilotDto.toPilot(createPilotDto)
            pilot.password = passwordEncoder.encode(pilot.password)
            pilotService.createPilot(pilot)
        }
    }
}