package io.smsc.model.mcc;

import java.io.Serializable;
import java.util.Objects;

public class MccPK implements Serializable {

    private Integer mcc;
    private Integer code;

    public Integer getMcc() {
        return mcc;
    }

    public void setMcc(Integer mcc) {
        this.mcc = mcc;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MccPK mccPk = (MccPK) o;

        if (!mcc.equals(mccPk.mcc)) return false;
        return code.equals(mccPk.code);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(mcc);
        result = 31 * result + Objects.hashCode(code);
        return result;
    }
}
