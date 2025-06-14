import { Tasks } from './tasks';
import { DataService } from '../core/services/data.service';
import { InitTasksUseCase } from '../core/use_cases/tasks/init_tasks_usecase';
import { of } from 'rxjs';

describe('Tasks Component', () => {
  let component: Tasks;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let initTasksUseCaseSpy: jasmine.SpyObj<InitTasksUseCase>;

  beforeEach(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'isBusy$', 'setBusy', 'setData'
    ]);
    // Simuler l'observable isBusy$
    Object.defineProperty(dataServiceSpy, 'isBusy$', { value: of(false) });

    initTasksUseCaseSpy = jasmine.createSpyObj('InitTasksUseCase', ['call']);
    initTasksUseCaseSpy.call.and.returnValue(Promise.resolve({
      categories: [],
      tags: [],
      tasks: []
    }));

    component = new Tasks(dataServiceSpy, initTasksUseCaseSpy);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the sidebar', () => {
    component.openSideBar();
    expect(component.showSiderBar).toBeTrue();
    component.closeSideBar();
    expect(component.showSiderBar).toBeFalse();
  });

  it('should open and close the add view', () => {
    component.openAddView();
    expect(component.showAddView).toBeTrue();
    component.closeAddView();
    expect(component.showAddView).toBeFalse();
  });

  it('should call setBusy and setData on ngOnInit', async () => {
    await component.ngOnInit();
    await Promise.resolve();
    await Promise.resolve();
    expect(dataServiceSpy.setBusy).toHaveBeenCalledWith(true);
    expect(dataServiceSpy.setData).toHaveBeenCalled();
    expect(dataServiceSpy.setBusy).toHaveBeenCalledWith(false);
  });
});