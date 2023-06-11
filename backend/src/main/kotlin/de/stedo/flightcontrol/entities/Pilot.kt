package de.stedo.flightcontrol.entities

import jakarta.persistence.*
import java.util.UUID

@Entity
class Pilot(
    @Id
    val id: String = UUID.randomUUID().toString(),
    val username: String,
    val surname: String,
    val lastname: String,
    var password: String,
    val roles: List<String> = listOf("USER"),
    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JoinColumn(name = "pilot_id", referencedColumnName = "id")
    val rcModels: Set<RcModel> = emptySet(),
) {
    fun toDto(pilot: Pilot): CreatePilotDto {
        return CreatePilotDto(
            username = pilot.username,
            registerKey = null,
            surname = pilot.surname,
            lastname = pilot.lastname,
            password = null,
        )
    }
}

class CreatePilotDto(
    val username: String,
    val registerKey: String?,
    val surname: String,
    val lastname: String,
    val password: String?,
) {
    fun toPilot(createPilotDto: CreatePilotDto): Pilot{
        return Pilot(
            username = createPilotDto.username,
            surname = createPilotDto.surname,
            lastname = createPilotDto.lastname,
            password = createPilotDto.password!!,
        )
    }
}

