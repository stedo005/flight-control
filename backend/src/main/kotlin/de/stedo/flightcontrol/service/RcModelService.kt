package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.entities.RcModel
import de.stedo.flightcontrol.repository.RcModelRepository
import org.springframework.stereotype.Service
import java.lang.IllegalArgumentException

@Service
class RcModelService(
    private val rcModelRepository: RcModelRepository
) {
    fun getModelById(modelId: String): RcModel{
        return rcModelRepository.findById(modelId)
            .orElseThrow { IllegalArgumentException("No Model found for Id: $modelId") }
    }

    fun createRcModel(rcModel: RcModel) {
        rcModelRepository.save(rcModel)
    }
}