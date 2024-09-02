import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfileUpdateComponent } from './profile-update.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Credentials } from '../../auth/model/credentials';
import { AxiosService } from '../../axios.service';
import { By } from '@angular/platform-browser';
import { User, UserType } from '../../auth/model/user';
import { UserService } from './mocks/user.service';

describe('ProfileUpdateComponent', () => {
  let comp: ProfileUpdateComponent;
  let fixture: ComponentFixture<ProfileUpdateComponent>;
  let axiosService: AxiosService;
  let httpController: HttpTestingController;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUpdateComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should have as isPasswordShown false', () => {
    expect(comp.isPasswordShown).toEqual(false);
  });

  it('should have was-validated class on form', () => {
    comp.onSubmit();
    let form = fixture.debugElement.query(By.css(".needs-validation")).nativeElement;
    expect(form).toHaveClass('was-validated');
  });

  it('should call onSubmit method', () => {
    spyOn(comp, 'onSubmit');
    let el = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
    el.click();
    expect(comp.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('form should be invalid - empty inputs', () => {
    comp.updateForm.controls["name"].setValue('');
    comp.updateForm.controls["surname"].setValue('');
    comp.updateForm.controls["address"].setValue('');
    comp.updateForm.controls["email"].setValue('');
    comp.updateForm.controls["phone"].setValue('');
    expect(comp.updateForm.valid).toBeFalsy();
  });

  it('form should be invalid - email not valid', () => {
    comp.updateForm.controls["name"].setValue('Andrija');
    comp.updateForm.controls["surname"].setValue('Slovic');
    comp.updateForm.controls["address"].setValue('Pionirska 1');
    comp.updateForm.controls["email"].setValue('iodsia');
    comp.updateForm.controls["phone"].setValue('063123123');
    expect(comp.updateForm.valid).toBeFalsy();
  });

  it('form should be invalid - phone number length invalid', () => {
    comp.updateForm.controls["name"].setValue('Andrija');
    comp.updateForm.controls["surname"].setValue('Slovic');
    comp.updateForm.controls["address"].setValue('Pionirska 1');
    comp.updateForm.controls["email"].setValue('andrija.slovic1@gmail.com');
    comp.updateForm.controls["phone"].setValue('06312312');
    expect(comp.updateForm.valid).toBeFalsy();
  });

  it('form should be invalid - password inputs shown but no data', () => {
    comp.updatePasswordControls();
    comp.updateForm.controls["name"].setValue('Andrija');
    comp.updateForm.controls["surname"].setValue('Slovic');
    comp.updateForm.controls["address"].setValue('Pionirska 1');
    comp.updateForm.controls["email"].setValue('andrija.slovic1@gmail.com');
    comp.updateForm.controls["phone"].setValue('063123123');
    comp.updateForm.controls["password"].setValue('');
    comp.updateForm.controls["confirmPassword"].setValue('');
    expect(comp.updateForm.valid).toBeFalsy();
  });

  it('form should be invalid - password inputs shown but length invalid', () => {
    comp.updatePasswordControls();
    comp.updateForm.controls["name"].setValue('Andrija');
    comp.updateForm.controls["surname"].setValue('Slovic');
    comp.updateForm.controls["address"].setValue('Pionirska 1');
    comp.updateForm.controls["email"].setValue('andrija.slovic1@gmail.com');
    comp.updateForm.controls["phone"].setValue('063123123');
    comp.updateForm.controls["password"].setValue('1234');
    comp.updateForm.controls["confirmPassword"].setValue('1234');
    let el = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
    el.click();
    expect(comp.updateForm.valid).toBeFalsy();
  });

  it('form should be invalid - password inputs shown but don\'t match', () => {
    comp.updatePasswordControls();
    comp.updateForm.controls["name"].setValue('Andrija');
    comp.updateForm.controls["surname"].setValue('Slovic');
    comp.updateForm.controls["address"].setValue('Pionirska 1');
    comp.updateForm.controls["email"].setValue('andrija.slovic1@gmail.com');
    comp.updateForm.controls["phone"].setValue('063123123');
    comp.updateForm.controls["password"].setValue('123456');
    comp.updateForm.controls["confirmPassword"].setValue('12345');
    let el = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
    el.click();
    expect(comp.updateForm.valid).toBeFalsy();
  });

  it('form should be valid - password inputs shown', () => {
    comp.updatePasswordControls();
    comp.updateForm.controls["name"].setValue('Andrija');
    comp.updateForm.controls["surname"].setValue('Slovic');
    comp.updateForm.controls["address"].setValue('Pionirska 1');
    comp.updateForm.controls["email"].setValue('andrija.slovic1@gmail.com');
    comp.updateForm.controls["phone"].setValue('063123123');
    comp.updateForm.controls["password"].setValue('123456');
    comp.updateForm.controls["confirmPassword"].setValue('123456');
    let el = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
    el.click();
    expect(comp.updateForm.valid).toBeTruthy();
  });

  it('form should be valid', () => {
    comp.updateForm.controls["name"].setValue('Andrija');
    comp.updateForm.controls["surname"].setValue('Slovic');
    comp.updateForm.controls["address"].setValue('Pionirska 1');
    comp.updateForm.controls["email"].setValue('andrija.slovic1@gmail.com');
    comp.updateForm.controls["phone"].setValue('063123123');
    expect(comp.updateForm.valid).toBeTruthy();
  });

  it('should call updateUser and return the updated user from the API', (done) => {
    const mockUser = new User('novi_user@gmail.com', '', 'User', 'User new surname', 'User\'s new address', '063123456', UserType.Guest, false);

    comp.updateForm.controls["name"].setValue(mockUser.name);
    comp.updateForm.controls["surname"].setValue(mockUser.surname);
    comp.updateForm.controls["address"].setValue(mockUser.address);
    comp.updateForm.controls["email"].setValue(mockUser.email);
    comp.updateForm.controls["phone"].setValue(mockUser.phone);

    spyOn(service, 'updateUser').and.callThrough();

    // simulate onsubmit call
    const submitData = { ...comp.updateForm.value };

    let updatedUser: User;
    if (comp.isPasswordShown)
      updatedUser = new User(submitData.email, submitData.password, submitData.name, submitData.surname, submitData.address, submitData.phone, UserType.Guest, false);
    else
      updatedUser = new User(submitData.email, "", submitData.name, submitData.surname, submitData.address, submitData.phone, UserType.Guest, false);

    service.updateUser(updatedUser).subscribe((data) => {
      expect(data).toEqual(mockUser);
      done()
    });

    expect(service.updateUser).toHaveBeenCalledWith(updatedUser);

    const req = httpController.expectOne({
      method: 'PUT',
      url: 'http://localhost:8080/account/' + mockUser.email,
    });

    req.flush(mockUser);
  });
});
