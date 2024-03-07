import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { UserService } from '../../services/user.service';
import { CategoryService, ICategory } from '../../services/category.service';
import { IGET_Transaction } from '../../services/transaction.service';
@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent {
  currentUserId: number;
  public categories: ICategory[] = [];

  constructor(
    private cognitoService: CognitoService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  public async ngOnInit() {
    //Get user
    const user = await this.cognitoService.getUser();
    this.userService.getUserByUsername(user.username).subscribe((res) => {
      this.currentUserId = res.id;

      this.categoryService.getCategoriesByUserId(1).subscribe((res): void => {
        this.categories.push(...res);
      

        this.categoryService
        .getCategoriesByUserId(this.currentUserId)
        .subscribe((res) => {
          this.categories.push(...res);      
        });
      });

     
    });
  }
}
