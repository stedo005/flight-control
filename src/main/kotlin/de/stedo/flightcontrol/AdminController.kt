package de.stedo.flightcontrol

import de.stedo.flightcontrol.repository.Pilots
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class AdminController(
    private val pilots: Pilots
) {
    @GetMapping("/all-pilots")
    fun getAllPilots() = pilots.findAll()

    @GetMapping("/make")
    fun makePilot() {
        pilots.save(
            Userinnen(
                bla = "Steve"
            )
        )
    }
}