import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Developer } from './developer';
import { DeveloperService } from './developer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public developers: Developer[];
  public editDeveloper: Developer;
  public deleteDeveloper: Developer;

  constructor(private developerService: DeveloperService) {}

  ngOnInit() {
    this.getDevelopers();
  }

  public getDevelopers(): void {
    this.developerService.getDevelopers().subscribe(
      (response: Developer[]) => {
        this.developers = response;
        console.log(this.developers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddDeveloper(addForm: NgForm): void {
    document.getElementById('add-developer-form').click();
    this.developerService.addDeveloper(addForm.value).subscribe(
      (response: Developer) => {
        console.log(response);
        this.getDevelopers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(developer: Developer): void {
    this.developerService.updateDeveloper(developer).subscribe(
      (response: Developer) => {
        console.log(response);
        this.getDevelopers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteDeveloper(developerId: number): void {
    this.developerService.deleteDeveloper(developerId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDevelopers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchDevelopers(key: string): void {
    console.log(key);
    const results: Developer[] = [];
    for (const developer of this.developers) {
      if (developer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || developer.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || developer.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || developer.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(developer);
      }
    }
    this.developers = results;
    if (results.length === 0 || !key) {
      this.getDevelopers();
    }
  }

  public onOpenModal(developer: Developer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    switch (mode) {
      case 'add':
        button.setAttribute('data-target', '#adddeveloperModal');
        break;
      case 'edit':
        this.editDeveloper = developer;
        button.setAttribute('data-target', '#updatedeveloperModal');
        break;
      case 'delete':
        this.deleteDeveloper = developer;
        button.setAttribute('data-target', '#deleteDeveloperModal');
        break;
    }
    container.appendChild(button);
    button.click();
  }
}
