package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.entities.CreatePilotDto
import de.stedo.flightcontrol.repository.PilotRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class PilotService(
    private val pilotRepository: PilotRepository,
) {
    fun createPilot(pilot: Pilot): ResponseEntity<CreatePilotDto> {
        return if (pilotRepository.findByUsername(pilot.username) == null) {
            pilotRepository.save(pilot)
            ResponseEntity(pilot.toDto(pilot), HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.CONFLICT)
        }
    }

    fun getPilot(user: String): ResponseEntity<Pilot> =
        ResponseEntity(pilotRepository.findByUsername(user), HttpStatus.OK)
}