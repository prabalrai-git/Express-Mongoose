import React, { useState } from "react";
import { Button, Modal } from "antd";

const ModalC = ({
  setModalVisible,
  modalVisible,
  deleteRecord,
  setDeleteId,
  deleteId,
}) => {
  const handleOk = () => {
    deleteRecord(deleteId);
    setDeleteId();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        open={modalVisible}
        onOk={handleOk}
        okText="Yes"
        onCancel={handleCancel}
      >
        Do you want to delete the record?
      </Modal>
    </>
  );
};

export default ModalC;
