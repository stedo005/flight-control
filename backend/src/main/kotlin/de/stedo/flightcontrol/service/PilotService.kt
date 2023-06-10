package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.entities.Pilot
import de.stedo.flightcontrol.repository.PilotRepository
import org.springframework.stereotype.Service

@Service
class PilotService(
    private val pilotRepository: PilotRepository,
) {
    fun createPilot(pilot: Pilot): Pilot {
        return pilotRepository.save(pilot)
    }
}