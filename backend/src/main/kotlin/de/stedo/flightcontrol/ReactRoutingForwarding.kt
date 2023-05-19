package de.stedo.flightcontrol

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class ReactRoutingForwarding {
    @RequestMapping(value = ["/**/{[path:[^\\.]*}"])
    fun forwardToRoutUrl() = "forward:/"
}