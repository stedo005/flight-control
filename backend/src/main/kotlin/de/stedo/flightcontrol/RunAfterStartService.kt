package de.stedo.flightcontrol

import de.stedo.flightcontrol.repository.Pilots
import org.springframework.boot.context.event.ApplicationStartedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
class RunAfterStartService(
    private val pilots: Pilots
) {
    @EventListener(ApplicationStartedEvent::class)
    private fun getPilots(){
        pilots.findAll()
        println("Ich bin da.")
    }

}