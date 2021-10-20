package com.williammahecha.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class HomeController {
	
	@GetMapping({"/", "/index", ""})
	public String index(Model model) {
		model.addAttribute("titulo", "Bienvenidos al reto 2 Ciclo 3 Mintic");
		return "index";
	}
	
	@GetMapping("/motocicletas")
	public String motocicletas(Model model) {
		model.addAttribute("titulo", "Motocicletas");
		return "motocicletas";
	}
	
	@GetMapping("/clientes")
	public String clientes(Model model) {
		model.addAttribute("titulo", "Clientes");
		return "clientes";
	}
	
	@GetMapping("/mensajes")
	public String mensajes(Model model) {
		model.addAttribute("titulo", "Mensajes");
		return "mensajes";
	}
}
