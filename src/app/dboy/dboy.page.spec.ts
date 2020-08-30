import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DboyPage } from './dboy.page';

describe('DboyPage', () => {
  let component: DboyPage;
  let fixture: ComponentFixture<DboyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DboyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DboyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
