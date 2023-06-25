package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.entities.CreatePilotDto
import de.stedo.flightcontrol.entities.PilotUpdateDto
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

    fun getPilotByUsername(user: String): ResponseEntity<Pilot> =
        ResponseEntity(pilotRepository.findByUsername(user), HttpStatus.OK)

    fun getPilotById(id: String): ResponseEntity<Pilot> =
        ResponseEntity(pilotRepository.findById(id).orElseThrow(), HttpStatus.OK)

    fun updatePilot(pilotUpdateDto: PilotUpdateDto): Pilot {
        return pilotRepository.findById(pilotUpdateDto.id).orElseThrow()
            .apply {
                pilotRepository.save(
                    Pilot(
                        id = id,
                        username = username,
                        firstname = pilotUpdateDto.firstname,
                        lastname = pilotUpdateDto.lastname,
                        password = password,
                        roles = roles,
                        rcModels = rcModels
                    )
                )
            }
    }
}