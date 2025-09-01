import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPost } from './map-post';

describe('MapPost', () => {
  let component: MapPost;
  let fixture: ComponentFixture<MapPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
