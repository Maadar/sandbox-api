import gallery from './gallery.controller';

describe('Gallery controller', () => {
  describe('addItem()', () => {
    it("this.tag should be undefined", () => {
      // Arrange
      const sut = new gallery();

      // Act
      sut.addItem();

      // Assert
      expect(sut.error).to.be.true;
      expect(sut.tag).to.be.undefined;
    });

    it('this.tag should be defined', () => {
      // Arrange
      const resource = {
        getResourceData: (tag) => {}
      };
      const sut = new gallery(resource);
      const Promise = require('bluebird');
      const deferred = Promise.defer();
      const stub = sinon.stub(sut, 'fetchData').returns(deferred.promise);
      const spy = sinon.spy(sut, 'createItem');

      // Act
      sut.tag = [];
      sut.addItem();

      // Assert
      expect(sut.error).to.be.false;
      sinon.assert.called(spy);
    });

  });

  describe('createItem()', () => {
    it('SHOULD invoke resource.getResourceData() and fetchData() method', () => {
      // Arrange
      const Promise = require('bluebird');
      const expect = require('chai');

      const deferred = Promise.defer();
      const tag = 'mock';
      const resource = {
        getResourceData: (tag) => {}
      };
      const sut = new gallery(resource);
      const Resource = sinon.mock(resource);
      const fetchData = sinon.stub(sut, 'fetchData').returns(deferred.promise);

      // Act
      sut.createItem();

      // Assert
      Resource.expects('getResourceData').once().withExactArgs(tag);
      sinon.assert.called(fetchData);
    });

  });

  describe('removeItem()', () => {
    it('SHOULD remove item and return array without "undefined" value', () => {
      // Arrange
      const sut = new gallery();

      // Act
      sut.galleries = [
        {
          'list': [1,2,3,4],
          'tagName': 'mock'
        },
        {
          'list': [11,22,33,44],
          'tagName': 'mock2'
        }
      ];
      sut.removeItem(0);

      // Assert
      expect(sut.galleries).to.be.an('array');
      expect(sut.galleries).to.have.length(1);
      expect(sut.galleries).to.not.include(undefined);
    });
  });

  describe('addGalleryToList()', () => {
    it('SHOULD add element to list without set parameter', () => {
      // Arrange
      const sut = new gallery();

      // Act
      sut.galleries = [];
      sut.images = [1,2,3,4];
      sut.tag = 'mock';
      sut.addGalleryToList();

      // Assert
      expect(sut.galleries).to.have.length(1);
      expect(sut.galleries).to.have.deep.property('[0].tagName', 'mock');
      expect(sut.galleries).to.have.deep.property('[0].list');
    });

    it('SHOULD add element to list with set parameter', () => {
      // Arrange
      const sut = new gallery();

      // Act
      sut.galleries = [];
      sut.images = [1,2,3,4];
      sut.addGalleryToList('mock');

      // Assert
      expect(sut.galleries).to.have.length(1);
      expect(sut.galleries).to.have.deep.property('[0].tagName', 'mock');
      expect(sut.galleries).to.have.deep.property('[0].list');
    });

  });

});
