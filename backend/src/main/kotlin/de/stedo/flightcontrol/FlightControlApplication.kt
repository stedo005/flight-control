package de.stedo.flightcontrol

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FlightControlApplication

fun main(args: Array<String>) {
	runApplication<FlightControlApplication>(*args)
}
