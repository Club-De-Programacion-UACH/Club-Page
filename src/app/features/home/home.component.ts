import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    selectedHours: { [key: string]: Set<string> } = {
        lunes: new Set(),
        martes: new Set(),
        miercoles: new Set(),
        jueves: new Set(),
        viernes: new Set(),
    };

    hours: string[] = this.generateHours();

    formData: { [key: string]: any } = {};

    generateHours(): string[] {
        const hours = [];
        for (let i = 8; i <= 16; i++) {
            hours.push(`${i}:00`);
        }
        return hours;
    }

    toggleSelection(day: string, hour: string) {
        if (this.selectedHours[day].has(hour)) {
            this.selectedHours[day].delete(hour);
        } else {
            this.selectedHours[day].add(hour);
        }
    }

    isSelected(day: string, hour: string): boolean {
        return this.selectedHours[day].has(hour);
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.formData = { ...this.selectedHours };
        console.log(this.formData);
        
        this.exportToExcel(this.formData);
    }

    exportToExcel(data: { [key: string]: Set<string> }) {
        // Crear un arreglo de horas del rango 8 a 16
        const hoursRange = this.generateHours(); // Asegúrate de que este método esté disponible

        // Crear un arreglo para almacenar los datos
        const dataArray = [];

        // Agregar encabezados
        const headers = ['Día', ...hoursRange];
        dataArray.push(headers);

        // Llenar el arreglo con los datos
        Object.keys(data).forEach(day => {
            const row = [day]; // Comenzar con el día
            hoursRange.forEach(hour => {
                // Verificar si la hora está seleccionada para el día
                if (data[day].has(hour)) {
                    row.push('A'); // Agregar la hora si está seleccionada
                } else {
                    row.push(''); // Dejar vacío si no está seleccionada
                }
            });
            dataArray.push(row); // Agregar la fila al arreglo
        });

        // Asegúrate de que dataArray tenga el formato correcto
        console.log(dataArray); // Para verificar que los datos son correctos

        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataArray); // Usar aoa_to_sheet para un arreglo de arreglos
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos del Formulario');
        XLSX.writeFile(workbook, 'datos_formulario.xlsx'); // Nombre del archivo
    }

    getFormDataKeys(): string[] {
        return Object.keys(this.formData);
    }
}
