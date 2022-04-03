import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open should work', () => {
    component.modalRef = {
      nativeElement: {
        style: {
          display: 'none',
        },
      },
    };
    component.open();

    expect(component.modalRef.nativeElement.style.display).toEqual('flex');
  });

  it('close should work', () => {
    component.modalRef = {
      nativeElement: {
        style: {
          display: 'flex',
        },
      },
    };
    component.close();

    expect(component.modalRef.nativeElement.style.display).toEqual('none');
  });
});
