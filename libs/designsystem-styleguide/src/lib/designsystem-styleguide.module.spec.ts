import { async, TestBed } from '@angular/core/testing';
import { DesignsystemStyleguideModule } from './designsystem-styleguide.module';

describe('DesignsystemStyleguideModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DesignsystemStyleguideModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DesignsystemStyleguideModule).toBeDefined();
  });
});
