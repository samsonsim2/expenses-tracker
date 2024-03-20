import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { IUserDTO, UserService } from '../../services/user.service';
import { CategoryService, ICategory } from '../../services/category.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent {
  currentUserId: number;
  currentUser = {
    amazonUsername: '',
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: '',
    mainCurrency: '',
  };
  public categories: ICategory[] = [];

  constructor(
    private cognitoService: CognitoService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  public async ngOnInit() {
    const user = await this.cognitoService.getUser();

    this.userService.getUserByUsername(user.username).subscribe((res) => {
      this.currentUserId = res.id;

      this.currentUser = {
        amazonUsername: res.amazonUsername,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        imageUrl: res.imageUrl,
        mainCurrency: res.mainCurrency,
      };

      this.getAllCategories();
    });
  }

  public getAllCategories() {
    this.categoryService.getCategoriesByUserId(1).subscribe((res): void => {
      this.categories.push(...res);
      this.categoryService
        .getCategoriesByUserId(this.currentUserId)
        .subscribe((res) => {
          this.categories.push(...res);
        });
    });
  }
}
