import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink,AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  authService = inject(AuthService);
}
