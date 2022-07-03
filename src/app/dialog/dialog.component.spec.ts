import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

// fdescribe('DialogComponent',()=>{
//   it('this is my first ',()=>{

//   });
// })

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


