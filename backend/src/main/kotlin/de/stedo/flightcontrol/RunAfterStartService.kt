package de.stedo.flightcontrol

import de.stedo.flightcontrol.repository.PilotRepository
import org.springframework.boot.context.event.ApplicationStartedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
class RunAfterStartService(
    private val pilotRepository: PilotRepository
) {
    @EventListener(ApplicationStartedEvent::class)
    private fun getPilots(){
        pilotRepository.findAll()
        println("Ich bin da.")
    }

}